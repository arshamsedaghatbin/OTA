package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.PartyRelation;
import com.roma.repository.PartyRelationRepository;
import com.roma.service.PartyRelationService;
import com.roma.service.dto.PartyRelationDTO;
import com.roma.service.mapper.PartyRelationMapper;
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

import com.roma.domain.enumeration.PartyRelationType;
/**
 * Test class for the PartyRelationResource REST controller.
 *
 * @see PartyRelationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class PartyRelationResourceIntTest {

    private static final PartyRelationType DEFAULT_PARTY_RELATION = PartyRelationType.USER;
    private static final PartyRelationType UPDATED_PARTY_RELATION = PartyRelationType.COUNTER;

    @Autowired
    private PartyRelationRepository partyRelationRepository;

    @Autowired
    private PartyRelationMapper partyRelationMapper;
    
    @Autowired
    private PartyRelationService partyRelationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPartyRelationMockMvc;

    private PartyRelation partyRelation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartyRelationResource partyRelationResource = new PartyRelationResource(partyRelationService);
        this.restPartyRelationMockMvc = MockMvcBuilders.standaloneSetup(partyRelationResource)
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
    public static PartyRelation createEntity(EntityManager em) {
        PartyRelation partyRelation = new PartyRelation()
            .partyRelation(DEFAULT_PARTY_RELATION);
        return partyRelation;
    }

    @Before
    public void initTest() {
        partyRelation = createEntity(em);
    }

    @Test
    @Transactional
    public void createPartyRelation() throws Exception {
        int databaseSizeBeforeCreate = partyRelationRepository.findAll().size();

        // Create the PartyRelation
        PartyRelationDTO partyRelationDTO = partyRelationMapper.toDto(partyRelation);
        restPartyRelationMockMvc.perform(post("/api/party-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyRelationDTO)))
            .andExpect(status().isCreated());

        // Validate the PartyRelation in the database
        List<PartyRelation> partyRelationList = partyRelationRepository.findAll();
        assertThat(partyRelationList).hasSize(databaseSizeBeforeCreate + 1);
        PartyRelation testPartyRelation = partyRelationList.get(partyRelationList.size() - 1);
        assertThat(testPartyRelation.getPartyRelation()).isEqualTo(DEFAULT_PARTY_RELATION);
    }

    @Test
    @Transactional
    public void createPartyRelationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partyRelationRepository.findAll().size();

        // Create the PartyRelation with an existing ID
        partyRelation.setId(1L);
        PartyRelationDTO partyRelationDTO = partyRelationMapper.toDto(partyRelation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartyRelationMockMvc.perform(post("/api/party-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PartyRelation in the database
        List<PartyRelation> partyRelationList = partyRelationRepository.findAll();
        assertThat(partyRelationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPartyRelations() throws Exception {
        // Initialize the database
        partyRelationRepository.saveAndFlush(partyRelation);

        // Get all the partyRelationList
        restPartyRelationMockMvc.perform(get("/api/party-relations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(partyRelation.getId().intValue())))
            .andExpect(jsonPath("$.[*].partyRelation").value(hasItem(DEFAULT_PARTY_RELATION.toString())));
    }
    
    @Test
    @Transactional
    public void getPartyRelation() throws Exception {
        // Initialize the database
        partyRelationRepository.saveAndFlush(partyRelation);

        // Get the partyRelation
        restPartyRelationMockMvc.perform(get("/api/party-relations/{id}", partyRelation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(partyRelation.getId().intValue()))
            .andExpect(jsonPath("$.partyRelation").value(DEFAULT_PARTY_RELATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPartyRelation() throws Exception {
        // Get the partyRelation
        restPartyRelationMockMvc.perform(get("/api/party-relations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePartyRelation() throws Exception {
        // Initialize the database
        partyRelationRepository.saveAndFlush(partyRelation);

        int databaseSizeBeforeUpdate = partyRelationRepository.findAll().size();

        // Update the partyRelation
        PartyRelation updatedPartyRelation = partyRelationRepository.findById(partyRelation.getId()).get();
        // Disconnect from session so that the updates on updatedPartyRelation are not directly saved in db
        em.detach(updatedPartyRelation);
        updatedPartyRelation
            .partyRelation(UPDATED_PARTY_RELATION);
        PartyRelationDTO partyRelationDTO = partyRelationMapper.toDto(updatedPartyRelation);

        restPartyRelationMockMvc.perform(put("/api/party-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyRelationDTO)))
            .andExpect(status().isOk());

        // Validate the PartyRelation in the database
        List<PartyRelation> partyRelationList = partyRelationRepository.findAll();
        assertThat(partyRelationList).hasSize(databaseSizeBeforeUpdate);
        PartyRelation testPartyRelation = partyRelationList.get(partyRelationList.size() - 1);
        assertThat(testPartyRelation.getPartyRelation()).isEqualTo(UPDATED_PARTY_RELATION);
    }

    @Test
    @Transactional
    public void updateNonExistingPartyRelation() throws Exception {
        int databaseSizeBeforeUpdate = partyRelationRepository.findAll().size();

        // Create the PartyRelation
        PartyRelationDTO partyRelationDTO = partyRelationMapper.toDto(partyRelation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartyRelationMockMvc.perform(put("/api/party-relations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyRelationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PartyRelation in the database
        List<PartyRelation> partyRelationList = partyRelationRepository.findAll();
        assertThat(partyRelationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePartyRelation() throws Exception {
        // Initialize the database
        partyRelationRepository.saveAndFlush(partyRelation);

        int databaseSizeBeforeDelete = partyRelationRepository.findAll().size();

        // Get the partyRelation
        restPartyRelationMockMvc.perform(delete("/api/party-relations/{id}", partyRelation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PartyRelation> partyRelationList = partyRelationRepository.findAll();
        assertThat(partyRelationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartyRelation.class);
        PartyRelation partyRelation1 = new PartyRelation();
        partyRelation1.setId(1L);
        PartyRelation partyRelation2 = new PartyRelation();
        partyRelation2.setId(partyRelation1.getId());
        assertThat(partyRelation1).isEqualTo(partyRelation2);
        partyRelation2.setId(2L);
        assertThat(partyRelation1).isNotEqualTo(partyRelation2);
        partyRelation1.setId(null);
        assertThat(partyRelation1).isNotEqualTo(partyRelation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartyRelationDTO.class);
        PartyRelationDTO partyRelationDTO1 = new PartyRelationDTO();
        partyRelationDTO1.setId(1L);
        PartyRelationDTO partyRelationDTO2 = new PartyRelationDTO();
        assertThat(partyRelationDTO1).isNotEqualTo(partyRelationDTO2);
        partyRelationDTO2.setId(partyRelationDTO1.getId());
        assertThat(partyRelationDTO1).isEqualTo(partyRelationDTO2);
        partyRelationDTO2.setId(2L);
        assertThat(partyRelationDTO1).isNotEqualTo(partyRelationDTO2);
        partyRelationDTO1.setId(null);
        assertThat(partyRelationDTO1).isNotEqualTo(partyRelationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(partyRelationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(partyRelationMapper.fromId(null)).isNull();
    }
}
