package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.AcountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Acount and its DTO AcountDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyMapper.class})
public interface AcountMapper extends EntityMapper<AcountDTO, Acount> {

    @Mapping(source = "party.id", target = "partyId")
    @Mapping(source = "adsress.id", target = "adsressId")
    AcountDTO toDto(Acount acount);

    @Mapping(source = "partyId", target = "party")
    @Mapping(target = "transactions", ignore = true)
    @Mapping(source = "adsressId", target = "adsress")
    Acount toEntity(AcountDTO acountDTO);

    default Acount fromId(Long id) {
        if (id == null) {
            return null;
        }
        Acount acount = new Acount();
        acount.setId(id);
        return acount;
    }
}
