package com.roma.service;

import com.roma.service.dto.TransactionRelationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TransactionRelation.
 */
public interface TransactionRelationService {

    /**
     * Save a transactionRelation.
     *
     * @param transactionRelationDTO the entity to save
     * @return the persisted entity
     */
    TransactionRelationDTO save(TransactionRelationDTO transactionRelationDTO);

    /**
     * Get all the transactionRelations.
     *
     * @return the list of entities
     */
    List<TransactionRelationDTO> findAll();


    /**
     * Get the "id" transactionRelation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TransactionRelationDTO> findOne(Long id);

    /**
     * Delete the "id" transactionRelation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
