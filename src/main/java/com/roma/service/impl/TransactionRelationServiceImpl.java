package com.roma.service.impl;

import com.roma.service.TransactionRelationService;
import com.roma.domain.TransactionRelation;
import com.roma.repository.TransactionRelationRepository;
import com.roma.service.dto.TransactionRelationDTO;
import com.roma.service.mapper.TransactionRelationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TransactionRelation.
 */
@Service
@Transactional
public class TransactionRelationServiceImpl implements TransactionRelationService {

    private final Logger log = LoggerFactory.getLogger(TransactionRelationServiceImpl.class);

    private final TransactionRelationRepository transactionRelationRepository;

    private final TransactionRelationMapper transactionRelationMapper;

    public TransactionRelationServiceImpl(TransactionRelationRepository transactionRelationRepository, TransactionRelationMapper transactionRelationMapper) {
        this.transactionRelationRepository = transactionRelationRepository;
        this.transactionRelationMapper = transactionRelationMapper;
    }

    /**
     * Save a transactionRelation.
     *
     * @param transactionRelationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionRelationDTO save(TransactionRelationDTO transactionRelationDTO) {
        log.debug("Request to save TransactionRelation : {}", transactionRelationDTO);

        TransactionRelation transactionRelation = transactionRelationMapper.toEntity(transactionRelationDTO);
        transactionRelation = transactionRelationRepository.save(transactionRelation);
        return transactionRelationMapper.toDto(transactionRelation);
    }

    /**
     * Get all the transactionRelations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionRelationDTO> findAll() {
        log.debug("Request to get all TransactionRelations");
        return transactionRelationRepository.findAll().stream()
            .map(transactionRelationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one transactionRelation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransactionRelationDTO> findOne(Long id) {
        log.debug("Request to get TransactionRelation : {}", id);
        return transactionRelationRepository.findById(id)
            .map(transactionRelationMapper::toDto);
    }

    /**
     * Delete the transactionRelation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionRelation : {}", id);
        transactionRelationRepository.deleteById(id);
    }
}
