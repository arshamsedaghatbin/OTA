package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TransactionRelation entity.
 */
public class TransactionRelationDTO implements Serializable {

    private Long id;

    private Long sourceAcountId;

    private Long destinationAcountId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSourceAcountId() {
        return sourceAcountId;
    }

    public void setSourceAcountId(Long transactionId) {
        this.sourceAcountId = transactionId;
    }

    public Long getDestinationAcountId() {
        return destinationAcountId;
    }

    public void setDestinationAcountId(Long transactionId) {
        this.destinationAcountId = transactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionRelationDTO transactionRelationDTO = (TransactionRelationDTO) o;
        if (transactionRelationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionRelationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionRelationDTO{" +
            "id=" + getId() +
            ", sourceAcount=" + getSourceAcountId() +
            ", destinationAcount=" + getDestinationAcountId() +
            "}";
    }
}
