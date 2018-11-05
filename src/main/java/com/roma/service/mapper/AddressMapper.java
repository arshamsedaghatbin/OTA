package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyMapper.class})
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {

    @Mapping(source = "party.id", target = "partyId")
    @Mapping(source = "party.id", target = "partyId")
    AddressDTO toDto(Address address);

    @Mapping(source = "partyId", target = "party")
    @Mapping(source = "partyId", target = "party")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
