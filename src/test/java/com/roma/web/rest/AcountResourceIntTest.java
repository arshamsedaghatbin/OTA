package com.roma.web.rest;

import com.roma.OtaApp;

import com.roma.domain.Acount;
import com.roma.repository.AcountRepository;
import com.roma.service.AcountService;
import com.roma.service.dto.AcountDTO;
import com.roma.service.mapper.AcountMapper;
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
import java.math.BigDecimal;
import java.util.List;


import static com.roma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.roma.domain.enumeration.AcountType;
/**
 * Test class for the AcountResource REST controller.
 *
 * @see AcountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OtaApp.class)
public class AcountResourceIntTest {

    private static final String DEFAULT_ACOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACOUNT_NUMBER = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private static final AcountType DEFAULT_ACOUNT_TYPE = AcountType.VALET;
    private static final AcountType UPDATED_ACOUNT_TYPE = AcountType.CREDIT;

    @Autowired
    private AcountRepository acountRepository;

    @Autowired
    private AcountMapper acountMapper;
    
    @Autowired
    private AcountService acountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAcountMockMvc;

    private Acount acount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcountResource acountResource = new AcountResource(acountService);
        this.restAcountMockMvc = MockMvcBuilders.standaloneSetup(acountResource)
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
    public static Acount createEntity(EntityManager em) {
        Acount acount = new Acount()
            .acountNumber(DEFAULT_ACOUNT_NUMBER)
            .balance(DEFAULT_BALANCE)
            .acountType(DEFAULT_ACOUNT_TYPE);
        return acount;
    }

    @Before
    public void initTest() {
        acount = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcount() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();

        // Create the Acount
        AcountDTO acountDTO = acountMapper.toDto(acount);
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acountDTO)))
            .andExpect(status().isCreated());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate + 1);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getAcountNumber()).isEqualTo(DEFAULT_ACOUNT_NUMBER);
        assertThat(testAcount.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testAcount.getAcountType()).isEqualTo(DEFAULT_ACOUNT_TYPE);
    }

    @Test
    @Transactional
    public void createAcountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acountRepository.findAll().size();

        // Create the Acount with an existing ID
        acount.setId(1L);
        AcountDTO acountDTO = acountMapper.toDto(acount);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAcountNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = acountRepository.findAll().size();
        // set the field null
        acount.setAcountNumber(null);

        // Create the Acount, which fails.
        AcountDTO acountDTO = acountMapper.toDto(acount);

        restAcountMockMvc.perform(post("/api/acounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acountDTO)))
            .andExpect(status().isBadRequest());

        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcounts() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get all the acountList
        restAcountMockMvc.perform(get("/api/acounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acount.getId().intValue())))
            .andExpect(jsonPath("$.[*].acountNumber").value(hasItem(DEFAULT_ACOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].acountType").value(hasItem(DEFAULT_ACOUNT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", acount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acount.getId().intValue()))
            .andExpect(jsonPath("$.acountNumber").value(DEFAULT_ACOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.intValue()))
            .andExpect(jsonPath("$.acountType").value(DEFAULT_ACOUNT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcount() throws Exception {
        // Get the acount
        restAcountMockMvc.perform(get("/api/acounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // Update the acount
        Acount updatedAcount = acountRepository.findById(acount.getId()).get();
        // Disconnect from session so that the updates on updatedAcount are not directly saved in db
        em.detach(updatedAcount);
        updatedAcount
            .acountNumber(UPDATED_ACOUNT_NUMBER)
            .balance(UPDATED_BALANCE)
            .acountType(UPDATED_ACOUNT_TYPE);
        AcountDTO acountDTO = acountMapper.toDto(updatedAcount);

        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acountDTO)))
            .andExpect(status().isOk());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);
        Acount testAcount = acountList.get(acountList.size() - 1);
        assertThat(testAcount.getAcountNumber()).isEqualTo(UPDATED_ACOUNT_NUMBER);
        assertThat(testAcount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testAcount.getAcountType()).isEqualTo(UPDATED_ACOUNT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAcount() throws Exception {
        int databaseSizeBeforeUpdate = acountRepository.findAll().size();

        // Create the Acount
        AcountDTO acountDTO = acountMapper.toDto(acount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcountMockMvc.perform(put("/api/acounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Acount in the database
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcount() throws Exception {
        // Initialize the database
        acountRepository.saveAndFlush(acount);

        int databaseSizeBeforeDelete = acountRepository.findAll().size();

        // Get the acount
        restAcountMockMvc.perform(delete("/api/acounts/{id}", acount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Acount> acountList = acountRepository.findAll();
        assertThat(acountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Acount.class);
        Acount acount1 = new Acount();
        acount1.setId(1L);
        Acount acount2 = new Acount();
        acount2.setId(acount1.getId());
        assertThat(acount1).isEqualTo(acount2);
        acount2.setId(2L);
        assertThat(acount1).isNotEqualTo(acount2);
        acount1.setId(null);
        assertThat(acount1).isNotEqualTo(acount2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcountDTO.class);
        AcountDTO acountDTO1 = new AcountDTO();
        acountDTO1.setId(1L);
        AcountDTO acountDTO2 = new AcountDTO();
        assertThat(acountDTO1).isNotEqualTo(acountDTO2);
        acountDTO2.setId(acountDTO1.getId());
        assertThat(acountDTO1).isEqualTo(acountDTO2);
        acountDTO2.setId(2L);
        assertThat(acountDTO1).isNotEqualTo(acountDTO2);
        acountDTO1.setId(null);
        assertThat(acountDTO1).isNotEqualTo(acountDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(acountMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(acountMapper.fromId(null)).isNull();
    }
}
