package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.PartyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Party and its DTO PartyDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyRelationMapper.class})
public interface PartyMapper extends EntityMapper<PartyDTO, Party> {

    @Mapping(source = "relation.id", target = "relationId")
    PartyDTO toDto(Party party);

    @Mapping(source = "relationId", target = "relation")
    @Mapping(target = "adsresses", ignore = true)
    @Mapping(target = "flighttickets", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "acounts", ignore = true)
    Party toEntity(PartyDTO partyDTO);

    default Party fromId(Long id) {
        if (id == null) {
            return null;
        }
        Party party = new Party();
        party.setId(id);
        return party;
    }
}
