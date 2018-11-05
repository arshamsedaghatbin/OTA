package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.PartyRelationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PartyRelation and its DTO PartyRelationDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyMapper.class})
public interface PartyRelationMapper extends EntityMapper<PartyRelationDTO, PartyRelation> {

    @Mapping(source = "fromParty.id", target = "fromPartyId")
    @Mapping(source = "toParty.id", target = "toPartyId")
    PartyRelationDTO toDto(PartyRelation partyRelation);

    @Mapping(source = "fromPartyId", target = "fromParty")
    @Mapping(source = "toPartyId", target = "toParty")
    PartyRelation toEntity(PartyRelationDTO partyRelationDTO);

    default PartyRelation fromId(Long id) {
        if (id == null) {
            return null;
        }
        PartyRelation partyRelation = new PartyRelation();
        partyRelation.setId(id);
        return partyRelation;
    }
}
