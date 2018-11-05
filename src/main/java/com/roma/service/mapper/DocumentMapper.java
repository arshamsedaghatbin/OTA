package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Document and its DTO DocumentDTO.
 */
@Mapper(componentModel = "spring", uses = {PartyMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {

    @Mapping(source = "party.id", target = "partyId")
    @Mapping(source = "party.id", target = "partyId")
    DocumentDTO toDto(Document document);

    @Mapping(source = "partyId", target = "party")
    @Mapping(source = "partyId", target = "party")
    Document toEntity(DocumentDTO documentDTO);

    default Document fromId(Long id) {
        if (id == null) {
            return null;
        }
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
