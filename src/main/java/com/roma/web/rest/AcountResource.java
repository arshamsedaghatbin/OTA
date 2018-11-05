package com.roma.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.roma.service.AcountService;
import com.roma.web.rest.errors.BadRequestAlertException;
import com.roma.web.rest.util.HeaderUtil;
import com.roma.service.dto.AcountDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Acount.
 */
@RestController
@RequestMapping("/api")
public class AcountResource {

    private final Logger log = LoggerFactory.getLogger(AcountResource.class);

    private static final String ENTITY_NAME = "acount";

    private final AcountService acountService;

    public AcountResource(AcountService acountService) {
        this.acountService = acountService;
    }

    /**
     * POST  /acounts : Create a new acount.
     *
     * @param acountDTO the acountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acountDTO, or with status 400 (Bad Request) if the acount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acounts")
    @Timed
    public ResponseEntity<AcountDTO> createAcount(@Valid @RequestBody AcountDTO acountDTO) throws URISyntaxException {
        log.debug("REST request to save Acount : {}", acountDTO);
        if (acountDTO.getId() != null) {
            throw new BadRequestAlertException("A new acount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcountDTO result = acountService.save(acountDTO);
        return ResponseEntity.created(new URI("/api/acounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acounts : Updates an existing acount.
     *
     * @param acountDTO the acountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acountDTO,
     * or with status 400 (Bad Request) if the acountDTO is not valid,
     * or with status 500 (Internal Server Error) if the acountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acounts")
    @Timed
    public ResponseEntity<AcountDTO> updateAcount(@Valid @RequestBody AcountDTO acountDTO) throws URISyntaxException {
        log.debug("REST request to update Acount : {}", acountDTO);
        if (acountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcountDTO result = acountService.save(acountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acounts : get all the acounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acounts in body
     */
    @GetMapping("/acounts")
    @Timed
    public List<AcountDTO> getAllAcounts() {
        log.debug("REST request to get all Acounts");
        return acountService.findAll();
    }

    /**
     * GET  /acounts/:id : get the "id" acount.
     *
     * @param id the id of the acountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/acounts/{id}")
    @Timed
    public ResponseEntity<AcountDTO> getAcount(@PathVariable Long id) {
        log.debug("REST request to get Acount : {}", id);
        Optional<AcountDTO> acountDTO = acountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(acountDTO);
    }

    /**
     * DELETE  /acounts/:id : delete the "id" acount.
     *
     * @param id the id of the acountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcount(@PathVariable Long id) {
        log.debug("REST request to delete Acount : {}", id);
        acountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
