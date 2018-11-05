package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.TransactionRelation;
import com.roma.repository.TransactionRelationRepository;
import com.roma.service.TransactionRelationService;
import com.roma.service.dto.TransactionRelationDTO;
import com.roma.service.mapper.TransactionRelationMapper;
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

/**
 * Test class for the TransactionRelationResource REST controller.
 *
 * @see TransactionRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class TransactionRelationResourceIntTest {

    @Autowired
    private TransactionRelationRepository transactionRelationRepository;

    @Autowired
    private TransactionRelationMapper transactionRelationMapper;
    
    @Autowired
    private TransactionRelationService transactionRelationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransactionRelationMockMvc;

    private TransactionRelation transactionRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionRelationResource transactionRelationResource = new TransactionRelationResource(transactionRelationService);
        this.restTransactionRelationMockMvc = MockMvcBuilders.standaloneSetup(transactionRelationResource)
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
    public static TransactionRelation createEntity(EntityManager em) {
        TransactionRelation transactionRelation = new TransactionRelation();
        return transactionRelation;
    }

    @Before
    public void initTest() {
        transactionRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionRelation() throws Exception {
        int databaseSizeBeforeCreate = transactionRelationRepository.findAll().size();

        // Create the TransactionRelation
        TransactionRelationDTO transactionRelationDTO = transactionRelationMapper.toDto(transactionRelation);
        restTransactionRelationMockMvc.perform(post("/api/transaction-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionRelation in the database
        List<TransactionRelation> transactionRelationList = transactionRelationRepository.findAll();
        assertThat(transactionRelationList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionRelation testTransactionRelation = transactionRelationList.get(transactionRelationList.size() - 1);
    }

    @Test
    @Transactional
    public void createTransactionRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionRelationRepository.findAll().size();

        // Create the TransactionRelation with an existing ID
        transactionRelation.setId(1L);
        TransactionRelationDTO transactionRelationDTO = transactionRelationMapper.toDto(transactionRelation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionRelationMockMvc.perform(post("/api/transaction-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionRelation in the database
        List<TransactionRelation> transactionRelationList = transactionRelationRepository.findAll();
        assertThat(transactionRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransactionRelations() throws Exception {
        // Initialize the database
        transactionRelationRepository.saveAndFlush(transactionRelation);

        // Get all the transactionRelationList
        restTransactionRelationMockMvc.perform(get("/api/transaction-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionRelation.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getTransactionRelation() throws Exception {
        // Initialize the database
        transactionRelationRepository.saveAndFlush(transactionRelation);

        // Get the transactionRelation
        restTransactionRelationMockMvc.perform(get("/api/transaction-relations/{id}", transactionRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionRelation.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionRelation() throws Exception {
        // Get the transactionRelation
        restTransactionRelationMockMvc.perform(get("/api/transaction-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionRelation() throws Exception {
        // Initialize the database
        transactionRelationRepository.saveAndFlush(transactionRelation);

        int databaseSizeBeforeUpdate = transactionRelationRepository.findAll().size();

        // Update the transactionRelation
        TransactionRelation updatedTransactionRelation = transactionRelationRepository.findById(transactionRelation.getId()).get();
        // Disconnect from session so that the updates on updatedTransactionRelation are not directly saved in db
        em.detach(updatedTransactionRelation);
        TransactionRelationDTO transactionRelationDTO = transactionRelationMapper.toDto(updatedTransactionRelation);

        restTransactionRelationMockMvc.perform(put("/api/transaction-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRelationDTO)))
            .andExpect(status().isOk());

        // Validate the TransactionRelation in the database
        List<TransactionRelation> transactionRelationList = transactionRelationRepository.findAll();
        assertThat(transactionRelationList).hasSize(databaseSizeBeforeUpdate);
        TransactionRelation testTransactionRelation = transactionRelationList.get(transactionRelationList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionRelation() throws Exception {
        int databaseSizeBeforeUpdate = transactionRelationRepository.findAll().size();

        // Create the TransactionRelation
        TransactionRelationDTO transactionRelationDTO = transactionRelationMapper.toDto(transactionRelation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionRelationMockMvc.perform(put("/api/transaction-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionRelation in the database
        List<TransactionRelation> transactionRelationList = transactionRelationRepository.findAll();
        assertThat(transactionRelationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransactionRelation() throws Exception {
        // Initialize the database
        transactionRelationRepository.saveAndFlush(transactionRelation);

        int databaseSizeBeforeDelete = transactionRelationRepository.findAll().size();

        // Get the transactionRelation
        restTransactionRelationMockMvc.perform(delete("/api/transaction-relations/{id}", transactionRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransactionRelation> transactionRelationList = transactionRelationRepository.findAll();
        assertThat(transactionRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionRelation.class);
        TransactionRelation transactionRelation1 = new TransactionRelation();
        transactionRelation1.setId(1L);
        TransactionRelation transactionRelation2 = new TransactionRelation();
        transactionRelation2.setId(transactionRelation1.getId());
        assertThat(transactionRelation1).isEqualTo(transactionRelation2);
        transactionRelation2.setId(2L);
        assertThat(transactionRelation1).isNotEqualTo(transactionRelation2);
        transactionRelation1.setId(null);
        assertThat(transactionRelation1).isNotEqualTo(transactionRelation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionRelationDTO.class);
        TransactionRelationDTO transactionRelationDTO1 = new TransactionRelationDTO();
        transactionRelationDTO1.setId(1L);
        TransactionRelationDTO transactionRelationDTO2 = new TransactionRelationDTO();
        assertThat(transactionRelationDTO1).isNotEqualTo(transactionRelationDTO2);
        transactionRelationDTO2.setId(transactionRelationDTO1.getId());
        assertThat(transactionRelationDTO1).isEqualTo(transactionRelationDTO2);
        transactionRelationDTO2.setId(2L);
        assertThat(transactionRelationDTO1).isNotEqualTo(transactionRelationDTO2);
        transactionRelationDTO1.setId(null);
        assertThat(transactionRelationDTO1).isNotEqualTo(transactionRelationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transactionRelationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transactionRelationMapper.fromId(null)).isNull();
    }
}
