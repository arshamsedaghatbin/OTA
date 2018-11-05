package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.TransactionRelationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransactionRelation and its DTO TransactionRelationDTO.
 */
@Mapper(componentModel = "spring", uses = {TransactionMapper.class})
public interface TransactionRelationMapper extends EntityMapper<TransactionRelationDTO, TransactionRelation> {

    @Mapping(source = "sourceAcount.id", target = "sourceAcountId")
    @Mapping(source = "destinationAcount.id", target = "destinationAcountId")
    TransactionRelationDTO toDto(TransactionRelation transactionRelation);

    @Mapping(source = "sourceAcountId", target = "sourceAcount")
    @Mapping(source = "destinationAcountId", target = "destinationAcount")
    TransactionRelation toEntity(TransactionRelationDTO transactionRelationDTO);

    default TransactionRelation fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionRelation transactionRelation = new TransactionRelation();
        transactionRelation.setId(id);
        return transactionRelation;
    }
}
