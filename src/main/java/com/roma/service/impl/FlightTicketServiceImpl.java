package com.roma.service.impl;

import com.roma.service.FlightTicketService;
import com.roma.domain.FlightTicket;
import com.roma.repository.FlightTicketRepository;
import com.roma.service.dto.FlightTicketDTO;
import com.roma.service.mapper.FlightTicketMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing FlightTicket.
 */
@Service
@Transactional
public class FlightTicketServiceImpl implements FlightTicketService {

    private final Logger log = LoggerFactory.getLogger(FlightTicketServiceImpl.class);

    private final FlightTicketRepository flightTicketRepository;

    private final FlightTicketMapper flightTicketMapper;

    public FlightTicketServiceImpl(FlightTicketRepository flightTicketRepository, FlightTicketMapper flightTicketMapper) {
        this.flightTicketRepository = flightTicketRepository;
        this.flightTicketMapper = flightTicketMapper;
    }

    /**
     * Save a flightTicket.
     *
     * @param flightTicketDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FlightTicketDTO save(FlightTicketDTO flightTicketDTO) {
        log.debug("Request to save FlightTicket : {}", flightTicketDTO);

        FlightTicket flightTicket = flightTicketMapper.toEntity(flightTicketDTO);
        flightTicket = flightTicketRepository.save(flightTicket);
        return flightTicketMapper.toDto(flightTicket);
    }

    /**
     * Get all the flightTickets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FlightTicketDTO> findAll() {
        log.debug("Request to get all FlightTickets");
        return flightTicketRepository.findAll().stream()
            .map(flightTicketMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one flightTicket by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FlightTicketDTO> findOne(Long id) {
        log.debug("Request to get FlightTicket : {}", id);
        return flightTicketRepository.findById(id)
            .map(flightTicketMapper::toDto);
    }

    /**
     * Delete the flightTicket by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FlightTicket : {}", id);
        flightTicketRepository.deleteById(id);
    }
}
