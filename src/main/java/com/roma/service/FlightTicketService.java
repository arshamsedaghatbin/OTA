package com.roma.service;

import com.roma.service.dto.FlightTicketDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FlightTicket.
 */
public interface FlightTicketService {

    /**
     * Save a flightTicket.
     *
     * @param flightTicketDTO the entity to save
     * @return the persisted entity
     */
    FlightTicketDTO save(FlightTicketDTO flightTicketDTO);

    /**
     * Get all the flightTickets.
     *
     * @return the list of entities
     */
    List<FlightTicketDTO> findAll();


    /**
     * Get the "id" flightTicket.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FlightTicketDTO> findOne(Long id);

    /**
     * Delete the "id" flightTicket.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
