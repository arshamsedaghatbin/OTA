package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.FlightTicket;
import com.roma.repository.FlightTicketRepository;
import com.roma.service.FlightTicketService;
import com.roma.service.dto.FlightTicketDTO;
import com.roma.service.mapper.FlightTicketMapper;
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
 * Test class for the FlightTicketResource REST controller.
 *
 * @see FlightTicketResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class FlightTicketResourceIntTest {

    private static final String DEFAULT_TCKET_ID = "AAAAAAAAAA";
    private static final String UPDATED_TCKET_ID = "BBBBBBBBBB";

    @Autowired
    private FlightTicketRepository flightTicketRepository;

    @Autowired
    private FlightTicketMapper flightTicketMapper;
    
    @Autowired
    private FlightTicketService flightTicketService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlightTicketMockMvc;

    private FlightTicket flightTicket;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightTicketResource flightTicketResource = new FlightTicketResource(flightTicketService);
        this.restFlightTicketMockMvc = MockMvcBuilders.standaloneSetup(flightTicketResource)
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
    public static FlightTicket createEntity(EntityManager em) {
        FlightTicket flightTicket = new FlightTicket()
            .tcketId(DEFAULT_TCKET_ID);
        return flightTicket;
    }

    @Before
    public void initTest() {
        flightTicket = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightTicket() throws Exception {
        int databaseSizeBeforeCreate = flightTicketRepository.findAll().size();

        // Create the FlightTicket
        FlightTicketDTO flightTicketDTO = flightTicketMapper.toDto(flightTicket);
        restFlightTicketMockMvc.perform(post("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicketDTO)))
            .andExpect(status().isCreated());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeCreate + 1);
        FlightTicket testFlightTicket = flightTicketList.get(flightTicketList.size() - 1);
        assertThat(testFlightTicket.getTcketId()).isEqualTo(DEFAULT_TCKET_ID);
    }

    @Test
    @Transactional
    public void createFlightTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightTicketRepository.findAll().size();

        // Create the FlightTicket with an existing ID
        flightTicket.setId(1L);
        FlightTicketDTO flightTicketDTO = flightTicketMapper.toDto(flightTicket);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightTicketMockMvc.perform(post("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicketDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightTickets() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        // Get all the flightTicketList
        restFlightTicketMockMvc.perform(get("/api/flight-tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightTicket.getId().intValue())))
            .andExpect(jsonPath("$.[*].tcketId").value(hasItem(DEFAULT_TCKET_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        // Get the flightTicket
        restFlightTicketMockMvc.perform(get("/api/flight-tickets/{id}", flightTicket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightTicket.getId().intValue()))
            .andExpect(jsonPath("$.tcketId").value(DEFAULT_TCKET_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightTicket() throws Exception {
        // Get the flightTicket
        restFlightTicketMockMvc.perform(get("/api/flight-tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        int databaseSizeBeforeUpdate = flightTicketRepository.findAll().size();

        // Update the flightTicket
        FlightTicket updatedFlightTicket = flightTicketRepository.findById(flightTicket.getId()).get();
        // Disconnect from session so that the updates on updatedFlightTicket are not directly saved in db
        em.detach(updatedFlightTicket);
        updatedFlightTicket
            .tcketId(UPDATED_TCKET_ID);
        FlightTicketDTO flightTicketDTO = flightTicketMapper.toDto(updatedFlightTicket);

        restFlightTicketMockMvc.perform(put("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicketDTO)))
            .andExpect(status().isOk());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeUpdate);
        FlightTicket testFlightTicket = flightTicketList.get(flightTicketList.size() - 1);
        assertThat(testFlightTicket.getTcketId()).isEqualTo(UPDATED_TCKET_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightTicket() throws Exception {
        int databaseSizeBeforeUpdate = flightTicketRepository.findAll().size();

        // Create the FlightTicket
        FlightTicketDTO flightTicketDTO = flightTicketMapper.toDto(flightTicket);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightTicketMockMvc.perform(put("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicketDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        int databaseSizeBeforeDelete = flightTicketRepository.findAll().size();

        // Get the flightTicket
        restFlightTicketMockMvc.perform(delete("/api/flight-tickets/{id}", flightTicket.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightTicket.class);
        FlightTicket flightTicket1 = new FlightTicket();
        flightTicket1.setId(1L);
        FlightTicket flightTicket2 = new FlightTicket();
        flightTicket2.setId(flightTicket1.getId());
        assertThat(flightTicket1).isEqualTo(flightTicket2);
        flightTicket2.setId(2L);
        assertThat(flightTicket1).isNotEqualTo(flightTicket2);
        flightTicket1.setId(null);
        assertThat(flightTicket1).isNotEqualTo(flightTicket2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightTicketDTO.class);
        FlightTicketDTO flightTicketDTO1 = new FlightTicketDTO();
        flightTicketDTO1.setId(1L);
        FlightTicketDTO flightTicketDTO2 = new FlightTicketDTO();
        assertThat(flightTicketDTO1).isNotEqualTo(flightTicketDTO2);
        flightTicketDTO2.setId(flightTicketDTO1.getId());
        assertThat(flightTicketDTO1).isEqualTo(flightTicketDTO2);
        flightTicketDTO2.setId(2L);
        assertThat(flightTicketDTO1).isNotEqualTo(flightTicketDTO2);
        flightTicketDTO1.setId(null);
        assertThat(flightTicketDTO1).isNotEqualTo(flightTicketDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(flightTicketMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(flightTicketMapper.fromId(null)).isNull();
    }
}
