package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.FlightTicketDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FlightTicket and its DTO FlightTicketDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyMapper.class})
public interface FlightTicketMapper extends EntityMapper<FlightTicketDTO, FlightTicket> {

    @Mapping(source = "party.id", target = "partyId")
    FlightTicketDTO toDto(FlightTicket flightTicket);

    @Mapping(source = "partyId", target = "party")
    FlightTicket toEntity(FlightTicketDTO flightTicketDTO);

    default FlightTicket fromId(Long id) {
        if (id == null) {
            return null;
        }
        FlightTicket flightTicket = new FlightTicket();
        flightTicket.setId(id);
        return flightTicket;
    }
}
