package com.roma.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.roma.service.PartyRelationService;
import com.roma.web.rest.errors.BadRequestAlertException;
import com.roma.web.rest.util.HeaderUtil;
import com.roma.service.dto.PartyRelationDTO;
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
 * REST controller for managing PartyRelation.
 */
@RestController
@RequestMapping("/api")
public class PartyRelationResource {

    private final Logger log = LoggerFactory.getLogger(PartyRelationResource.class);

    private static final String ENTITY_NAME = "partyRelation";

    private final PartyRelationService partyRelationService;

    public PartyRelationResource(PartyRelationService partyRelationService) {
        this.partyRelationService = partyRelationService;
    }

    /**
     * POST  /party-relations : Create a new partyRelation.
     *
     * @param partyRelationDTO the partyRelationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new partyRelationDTO, or with status 400 (Bad Request) if the partyRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/party-relations")
    @Timed
    public ResponseEntity<PartyRelationDTO> createPartyRelation(@RequestBody PartyRelationDTO partyRelationDTO) throws URISyntaxException {
        log.debug("REST request to save PartyRelation : {}", partyRelationDTO);
        if (partyRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new partyRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartyRelationDTO result = partyRelationService.save(partyRelationDTO);
        return ResponseEntity.created(new URI("/api/party-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /party-relations : Updates an existing partyRelation.
     *
     * @param partyRelationDTO the partyRelationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated partyRelationDTO,
     * or with status 400 (Bad Request) if the partyRelationDTO is not valid,
     * or with status 500 (Internal Server Error) if the partyRelationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/party-relations")
    @Timed
    public ResponseEntity<PartyRelationDTO> updatePartyRelation(@RequestBody PartyRelationDTO partyRelationDTO) throws URISyntaxException {
        log.debug("REST request to update PartyRelation : {}", partyRelationDTO);
        if (partyRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartyRelationDTO result = partyRelationService.save(partyRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, partyRelationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /party-relations : get all the partyRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of partyRelations in body
     */
    @GetMapping("/party-relations")
    @Timed
    public List<PartyRelationDTO> getAllPartyRelations() {
        log.debug("REST request to get all PartyRelations");
        return partyRelationService.findAll();
    }

    /**
     * GET  /party-relations/:id : get the "id" partyRelation.
     *
     * @param id the id of the partyRelationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the partyRelationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/party-relations/{id}")
    @Timed
    public ResponseEntity<PartyRelationDTO> getPartyRelation(@PathVariable Long id) {
        log.debug("REST request to get PartyRelation : {}", id);
        Optional<PartyRelationDTO> partyRelationDTO = partyRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(partyRelationDTO);
    }

    /**
     * DELETE  /party-relations/:id : delete the "id" partyRelation.
     *
     * @param id the id of the partyRelationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/party-relations/{id}")
    @Timed
    public ResponseEntity<Void> deletePartyRelation(@PathVariable Long id) {
        log.debug("REST request to delete PartyRelation : {}", id);
        partyRelationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
