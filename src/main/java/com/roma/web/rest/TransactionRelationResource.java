package com.roma.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.roma.service.TransactionRelationService;
import com.roma.web.rest.errors.BadRequestAlertException;
import com.roma.web.rest.util.HeaderUtil;
import com.roma.service.dto.TransactionRelationDTO;
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
 * REST controller for managing TransactionRelation.
 */
@RestController
@RequestMapping("/api")
public class TransactionRelationResource {

    private final Logger log = LoggerFactory.getLogger(TransactionRelationResource.class);

    private static final String ENTITY_NAME = "transactionRelation";

    private final TransactionRelationService transactionRelationService;

    public TransactionRelationResource(TransactionRelationService transactionRelationService) {
        this.transactionRelationService = transactionRelationService;
    }

    /**
     * POST  /transaction-relations : Create a new transactionRelation.
     *
     * @param transactionRelationDTO the transactionRelationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transactionRelationDTO, or with status 400 (Bad Request) if the transactionRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaction-relations")
    @Timed
    public ResponseEntity<TransactionRelationDTO> createTransactionRelation(@RequestBody TransactionRelationDTO transactionRelationDTO) throws URISyntaxException {
        log.debug("REST request to save TransactionRelation : {}", transactionRelationDTO);
        if (transactionRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new transactionRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionRelationDTO result = transactionRelationService.save(transactionRelationDTO);
        return ResponseEntity.created(new URI("/api/transaction-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaction-relations : Updates an existing transactionRelation.
     *
     * @param transactionRelationDTO the transactionRelationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transactionRelationDTO,
     * or with status 400 (Bad Request) if the transactionRelationDTO is not valid,
     * or with status 500 (Internal Server Error) if the transactionRelationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaction-relations")
    @Timed
    public ResponseEntity<TransactionRelationDTO> updateTransactionRelation(@RequestBody TransactionRelationDTO transactionRelationDTO) throws URISyntaxException {
        log.debug("REST request to update TransactionRelation : {}", transactionRelationDTO);
        if (transactionRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransactionRelationDTO result = transactionRelationService.save(transactionRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transactionRelationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaction-relations : get all the transactionRelations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transactionRelations in body
     */
    @GetMapping("/transaction-relations")
    @Timed
    public List<TransactionRelationDTO> getAllTransactionRelations() {
        log.debug("REST request to get all TransactionRelations");
        return transactionRelationService.findAll();
    }

    /**
     * GET  /transaction-relations/:id : get the "id" transactionRelation.
     *
     * @param id the id of the transactionRelationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transactionRelationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transaction-relations/{id}")
    @Timed
    public ResponseEntity<TransactionRelationDTO> getTransactionRelation(@PathVariable Long id) {
        log.debug("REST request to get TransactionRelation : {}", id);
        Optional<TransactionRelationDTO> transactionRelationDTO = transactionRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transactionRelationDTO);
    }

    /**
     * DELETE  /transaction-relations/:id : delete the "id" transactionRelation.
     *
     * @param id the id of the transactionRelationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaction-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransactionRelation(@PathVariable Long id) {
        log.debug("REST request to delete TransactionRelation : {}", id);
        transactionRelationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
