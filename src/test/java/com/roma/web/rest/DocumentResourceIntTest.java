package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.Document;
import com.roma.repository.DocumentRepository;
import com.roma.service.DocumentService;
import com.roma.service.dto.DocumentDTO;
import com.roma.service.mapper.DocumentMapper;
import com.roma.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.roma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.roma.domain.enumeration.DocumenntType;
/**
 * Test class for the DocumentResource REST controller.
 *
 * @see DocumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class DocumentResourceIntTest {

    private static final DocumenntType DEFAULT_ADDRES_TYPE = DocumenntType.DOC;
    private static final DocumenntType UPDATED_ADDRES_TYPE = DocumenntType.DOC;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentMapper documentMapper;
    
    @Autowired
    private DocumentService documentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentMockMvc;

    private Document document;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentResource documentResource = new DocumentResource(documentService);
        this.restDocumentMockMvc = MockMvcBuilders.standaloneSetup(documentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Document createEntity(EntityManager em) {
        Document document = new Document()
            .addresType(DEFAULT_ADDRES_TYPE)
            .description(DEFAULT_DESCRIPTION);
        return document;
    }

    @Before
    public void initTest() {
        document = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocument() throws Exception {
        int databaseSizeBeforeCreate = documentRepository.findAll().size();

        // Create the Document
        DocumentDTO documentDTO = documentMapper.toDto(document);
        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isCreated());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeCreate + 1);
        Document testDocument = documentList.get(documentList.size() - 1);
        assertThat(testDocument.getAddresType()).isEqualTo(DEFAULT_ADDRES_TYPE);
        assertThat(testDocument.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentRepository.findAll().size();

        // Create the Document with an existing ID
        document.setId(1L);
        DocumentDTO documentDTO = documentMapper.toDto(document);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentMockMvc.perform(post("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocuments() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        // Get all the documentList
        restDocumentMockMvc.perform(get("/api/documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(document.getId().intValue())))
            .andExpect(jsonPath("$.[*].addresType").value(hasItem(DEFAULT_ADDRES_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        // Get the document
        restDocumentMockMvc.perform(get("/api/documents/{id}", document.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(document.getId().intValue()))
            .andExpect(jsonPath("$.addresType").value(DEFAULT_ADDRES_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocument() throws Exception {
        // Get the document
        restDocumentMockMvc.perform(get("/api/documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        int databaseSizeBeforeUpdate = documentRepository.findAll().size();

        // Update the document
        Document updatedDocument = documentRepository.findById(document.getId()).get();
        // Disconnect from session so that the updates on updatedDocument are not directly saved in db
        em.detach(updatedDocument);
        updatedDocument
            .addresType(UPDATED_ADDRES_TYPE)
            .description(UPDATED_DESCRIPTION);
        DocumentDTO documentDTO = documentMapper.toDto(updatedDocument);

        restDocumentMockMvc.perform(put("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isOk());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeUpdate);
        Document testDocument = documentList.get(documentList.size() - 1);
        assertThat(testDocument.getAddresType()).isEqualTo(UPDATED_ADDRES_TYPE);
        assertThat(testDocument.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDocument() throws Exception {
        int databaseSizeBeforeUpdate = documentRepository.findAll().size();

        // Create the Document
        DocumentDTO documentDTO = documentMapper.toDto(document);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentMockMvc.perform(put("/api/documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Document in the database
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocument() throws Exception {
        // Initialize the database
        documentRepository.saveAndFlush(document);

        int databaseSizeBeforeDelete = documentRepository.findAll().size();

        // Get the document
        restDocumentMockMvc.perform(delete("/api/documents/{id}", document.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Document> documentList = documentRepository.findAll();
        assertThat(documentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Document.class);
        Document document1 = new Document();
        document1.setId(1L);
        Document document2 = new Document();
        document2.setId(document1.getId());
        assertThat(document1).isEqualTo(document2);
        document2.setId(2L);
        assertThat(document1).isNotEqualTo(document2);
        document1.setId(null);
        assertThat(document1).isNotEqualTo(document2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentDTO.class);
        DocumentDTO documentDTO1 = new DocumentDTO();
        documentDTO1.setId(1L);
        DocumentDTO documentDTO2 = new DocumentDTO();
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
        documentDTO2.setId(documentDTO1.getId());
        assertThat(documentDTO1).isEqualTo(documentDTO2);
        documentDTO2.setId(2L);
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
        documentDTO1.setId(null);
        assertThat(documentDTO1).isNotEqualTo(documentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(documentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(documentMapper.fromId(null)).isNull();
    }
}
