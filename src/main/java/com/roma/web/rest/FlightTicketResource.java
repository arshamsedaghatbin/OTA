package com.roma.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.roma.service.FlightTicketService;
import com.roma.web.rest.errors.BadRequestAlertException;
import com.roma.web.rest.util.HeaderUtil;
import com.roma.service.dto.FlightTicketDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FlightTicket.
 */
@RestController
@RequestMapping("/api")
public class FlightTicketResource {

    private final Logger log = LoggerFactory.getLogger(FlightTicketResource.class);

    private static final String ENTITY_NAME = "flightTicket";

    private final FlightTicketService flightTicketService;

    public FlightTicketResource(FlightTicketService flightTicketService) {
        this.flightTicketService = flightTicketService;
    }

    /**
     * POST  /flight-tickets : Create a new flightTicket.
     *
     * @param flightTicketDTO the flightTicketDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightTicketDTO, or with status 400 (Bad Request) if the flightTicket has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-tickets")
    @Timed
    public ResponseEntity<FlightTicketDTO> createFlightTicket(@RequestBody FlightTicketDTO flightTicketDTO) throws URISyntaxException {
        log.debug("REST request to save FlightTicket : {}", flightTicketDTO);
        if (flightTicketDTO.getId() != null) {
            throw new BadRequestAlertException("A new flightTicket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightTicketDTO result = flightTicketService.save(flightTicketDTO);
        return ResponseEntity.created(new URI("/api/flight-tickets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-tickets : Updates an existing flightTicket.
     *
     * @param flightTicketDTO the flightTicketDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightTicketDTO,
     * or with status 400 (Bad Request) if the flightTicketDTO is not valid,
     * or with status 500 (Internal Server Error) if the flightTicketDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-tickets")
    @Timed
    public ResponseEntity<FlightTicketDTO> updateFlightTicket(@RequestBody FlightTicketDTO flightTicketDTO) throws URISyntaxException {
        log.debug("REST request to update FlightTicket : {}", flightTicketDTO);
        if (flightTicketDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightTicketDTO result = flightTicketService.save(flightTicketDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightTicketDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-tickets : get all the flightTickets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightTickets in body
     */
    @GetMapping("/flight-tickets")
    @Timed
    public List<FlightTicketDTO> getAllFlightTickets() {
        log.debug("REST request to get all FlightTickets");
        return flightTicketService.findAll();
    }

    /**
     * GET  /flight-tickets/:id : get the "id" flightTicket.
     *
     * @param id the id of the flightTicketDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightTicketDTO, or with status 404 (Not Found)
     */
    @GetMapping("/flight-tickets/{id}")
    @Timed
    public ResponseEntity<FlightTicketDTO> getFlightTicket(@PathVariable Long id) {
        log.debug("REST request to get FlightTicket : {}", id);
        Optional<FlightTicketDTO> flightTicketDTO = flightTicketService.findOne(id);
        return ResponseUtil.wrapOrNotFound(flightTicketDTO);
    }

    /**
     * DELETE  /flight-tickets/:id : delete the "id" flightTicket.
     *
     * @param id the id of the flightTicketDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-tickets/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightTicket(@PathVariable Long id) {
        log.debug("REST request to delete FlightTicket : {}", id);
        flightTicketService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
