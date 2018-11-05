package com.roma.service;

import com.roma.service.dto.PartyRelationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PartyRelation.
 */
public interface PartyRelationService {

    /**
     * Save a partyRelation.
     *
     * @param partyRelationDTO the entity to save
     * @return the persisted entity
     */
    PartyRelationDTO save(PartyRelationDTO partyRelationDTO);

    /**
     * Get all the partyRelations.
     *
     * @return the list of entities
     */
    List<PartyRelationDTO> findAll();


    /**
     * Get the "id" partyRelation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PartyRelationDTO> findOne(Long id);

    /**
     * Delete the "id" partyRelation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
