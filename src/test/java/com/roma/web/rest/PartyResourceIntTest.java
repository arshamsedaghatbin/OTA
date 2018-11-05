package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.Party;
import com.roma.repository.PartyRepository;
import com.roma.service.PartyService;
import com.roma.service.dto.PartyDTO;
import com.roma.service.mapper.PartyMapper;
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

import com.roma.domain.enumeration.PartyType;
/**
 * Test class for the PartyResource REST controller.
 *
 * @see PartyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class PartyResourceIntTest {

    private static final String DEFAULT_UUID = "AAAAAAAAAA";
    private static final String UPDATED_UUID = "BBBBBBBBBB";

    private static final PartyType DEFAULT_PERTY_TYPE = PartyType.INDEVIDUAL;
    private static final PartyType UPDATED_PERTY_TYPE = PartyType.BUSINESE;

    @Autowired
    private PartyRepository partyRepository;

    @Autowired
    private PartyMapper partyMapper;
    
    @Autowired
    private PartyService partyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPartyMockMvc;

    private Party party;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PartyResource partyResource = new PartyResource(partyService);
        this.restPartyMockMvc = MockMvcBuilders.standaloneSetup(partyResource)
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
    public static Party createEntity(EntityManager em) {
        Party party = new Party()
            .uuid(DEFAULT_UUID)
            .pertyType(DEFAULT_PERTY_TYPE);
        return party;
    }

    @Before
    public void initTest() {
        party = createEntity(em);
    }

    @Test
    @Transactional
    public void createParty() throws Exception {
        int databaseSizeBeforeCreate = partyRepository.findAll().size();

        // Create the Party
        PartyDTO partyDTO = partyMapper.toDto(party);
        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyDTO)))
            .andExpect(status().isCreated());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeCreate + 1);
        Party testParty = partyList.get(partyList.size() - 1);
        assertThat(testParty.getUuid()).isEqualTo(DEFAULT_UUID);
        assertThat(testParty.getPertyType()).isEqualTo(DEFAULT_PERTY_TYPE);
    }

    @Test
    @Transactional
    public void createPartyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = partyRepository.findAll().size();

        // Create the Party with an existing ID
        party.setId(1L);
        PartyDTO partyDTO = partyMapper.toDto(party);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPartyMockMvc.perform(post("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParties() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        // Get all the partyList
        restPartyMockMvc.perform(get("/api/parties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(party.getId().intValue())))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
            .andExpect(jsonPath("$.[*].pertyType").value(hasItem(DEFAULT_PERTY_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        // Get the party
        restPartyMockMvc.perform(get("/api/parties/{id}", party.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(party.getId().intValue()))
            .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()))
            .andExpect(jsonPath("$.pertyType").value(DEFAULT_PERTY_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParty() throws Exception {
        // Get the party
        restPartyMockMvc.perform(get("/api/parties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        int databaseSizeBeforeUpdate = partyRepository.findAll().size();

        // Update the party
        Party updatedParty = partyRepository.findById(party.getId()).get();
        // Disconnect from session so that the updates on updatedParty are not directly saved in db
        em.detach(updatedParty);
        updatedParty
            .uuid(UPDATED_UUID)
            .pertyType(UPDATED_PERTY_TYPE);
        PartyDTO partyDTO = partyMapper.toDto(updatedParty);

        restPartyMockMvc.perform(put("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyDTO)))
            .andExpect(status().isOk());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeUpdate);
        Party testParty = partyList.get(partyList.size() - 1);
        assertThat(testParty.getUuid()).isEqualTo(UPDATED_UUID);
        assertThat(testParty.getPertyType()).isEqualTo(UPDATED_PERTY_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingParty() throws Exception {
        int databaseSizeBeforeUpdate = partyRepository.findAll().size();

        // Create the Party
        PartyDTO partyDTO = partyMapper.toDto(party);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPartyMockMvc.perform(put("/api/parties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(partyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Party in the database
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParty() throws Exception {
        // Initialize the database
        partyRepository.saveAndFlush(party);

        int databaseSizeBeforeDelete = partyRepository.findAll().size();

        // Get the party
        restPartyMockMvc.perform(delete("/api/parties/{id}", party.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Party> partyList = partyRepository.findAll();
        assertThat(partyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Party.class);
        Party party1 = new Party();
        party1.setId(1L);
        Party party2 = new Party();
        party2.setId(party1.getId());
        assertThat(party1).isEqualTo(party2);
        party2.setId(2L);
        assertThat(party1).isNotEqualTo(party2);
        party1.setId(null);
        assertThat(party1).isNotEqualTo(party2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartyDTO.class);
        PartyDTO partyDTO1 = new PartyDTO();
        partyDTO1.setId(1L);
        PartyDTO partyDTO2 = new PartyDTO();
        assertThat(partyDTO1).isNotEqualTo(partyDTO2);
        partyDTO2.setId(partyDTO1.getId());
        assertThat(partyDTO1).isEqualTo(partyDTO2);
        partyDTO2.setId(2L);
        assertThat(partyDTO1).isNotEqualTo(partyDTO2);
        partyDTO1.setId(null);
        assertThat(partyDTO1).isNotEqualTo(partyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(partyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(partyMapper.fromId(null)).isNull();
    }
}
