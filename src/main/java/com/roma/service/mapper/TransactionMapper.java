package com.roma.service.mapper;

import com.roma.domain.*;
import com.roma.service.dto.TransactionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Transaction and its DTO TransactionDTO.
 */
@Mapper(componentModel = "spring", uses = {AcountMapper.class, TransactionRelationMapper.class})
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {

    @Mapping(source = "acount.id", target = "acountId")
    @Mapping(source = "transactionRelation.id", target = "transactionRelationId")
    @Mapping(source = "transaction.id", target = "transactionId")
    TransactionDTO toDto(Transaction transaction);

    @Mapping(source = "acountId", target = "acount")
    @Mapping(source = "transactionRelationId", target = "transactionRelation")
    @Mapping(source = "transactionId", target = "transaction")
    Transaction toEntity(TransactionDTO transactionDTO);

    default Transaction fromId(Long id) {
        if (id == null) {
            return null;
        }
        Transaction transaction = new Transaction();
        transaction.setId(id);
        return transaction;
    }
}
