package com.roma.service.impl;

import com.roma.service.PartyRelationService;
import com.roma.domain.PartyRelation;
import com.roma.repository.PartyRelationRepository;
import com.roma.service.dto.PartyRelationDTO;
import com.roma.service.mapper.PartyRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing PartyRelation.
 */
@Service
@Transactional
public class PartyRelationServiceImpl implements PartyRelationService {

    private final Logger log = LoggerFactory.getLogger(PartyRelationServiceImpl.class);

    private final PartyRelationRepository partyRelationRepository;

    private final PartyRelationMapper partyRelationMapper;

    public PartyRelationServiceImpl(PartyRelationRepository partyRelationRepository, PartyRelationMapper partyRelationMapper) {
        this.partyRelationRepository = partyRelationRepository;
        this.partyRelationMapper = partyRelationMapper;
    }

    /**
     * Save a partyRelation.
     *
     * @param partyRelationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PartyRelationDTO save(PartyRelationDTO partyRelationDTO) {
        log.debug("Request to save PartyRelation : {}", partyRelationDTO);

        PartyRelation partyRelation = partyRelationMapper.toEntity(partyRelationDTO);
        partyRelation = partyRelationRepository.save(partyRelation);
        return partyRelationMapper.toDto(partyRelation);
    }

    /**
     * Get all the partyRelations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PartyRelationDTO> findAll() {
        log.debug("Request to get all PartyRelations");
        return partyRelationRepository.findAll().stream()
            .map(partyRelationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one partyRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PartyRelationDTO> findOne(Long id) {
        log.debug("Request to get PartyRelation : {}", id);
        return partyRelationRepository.findById(id)
            .map(partyRelationMapper::toDto);
    }

    /**
     * Delete the partyRelation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PartyRelation : {}", id);
        partyRelationRepository.deleteById(id);
    }
}
