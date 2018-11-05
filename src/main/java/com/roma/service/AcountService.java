package com.roma.service;

import com.roma.service.dto.AcountDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Acount.
 */
public interface AcountService {

    /**
     * Save a acount.
     *
     * @param acountDTO the entity to save
     * @return the persisted entity
     */
    AcountDTO save(AcountDTO acountDTO);

    /**
     * Get all the acounts.
     *
     * @return the list of entities
     */
    List<AcountDTO> findAll();


    /**
     * Get the "id" acount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AcountDTO> findOne(Long id);

    /**
     * Delete the "id" acount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
