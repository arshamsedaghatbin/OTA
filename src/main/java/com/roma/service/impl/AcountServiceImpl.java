package com.roma.service.impl;

import com.roma.service.AcountService;
import com.roma.domain.Acount;
import com.roma.repository.AcountRepository;
import com.roma.service.dto.AcountDTO;
import com.roma.service.mapper.AcountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Acount.
 */
@Service
@Transactional
public class AcountServiceImpl implements AcountService {

    private final Logger log = LoggerFactory.getLogger(AcountServiceImpl.class);

    private final AcountRepository acountRepository;

    private final AcountMapper acountMapper;

    public AcountServiceImpl(AcountRepository acountRepository, AcountMapper acountMapper) {
        this.acountRepository = acountRepository;
        this.acountMapper = acountMapper;
    }

    /**
     * Save a acount.
     *
     * @param acountDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AcountDTO save(AcountDTO acountDTO) {
        log.debug("Request to save Acount : {}", acountDTO);

        Acount acount = acountMapper.toEntity(acountDTO);
        acount = acountRepository.save(acount);
        return acountMapper.toDto(acount);
    }

    /**
     * Get all the acounts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AcountDTO> findAll() {
        log.debug("Request to get all Acounts");
        return acountRepository.findAll().stream()
            .map(acountMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one acount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AcountDTO> findOne(Long id) {
        log.debug("Request to get Acount : {}", id);
        return acountRepository.findById(id)
            .map(acountMapper::toDto);
    }

    /**
     * Delete the acount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Acount : {}", id);
        acountRepository.deleteById(id);
    }
}
