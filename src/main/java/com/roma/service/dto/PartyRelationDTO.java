package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.roma.domain.enumeration.PartyRelationType;

/**
 * A DTO for the PartyRelation entity.
 */
public class PartyRelationDTO implements Serializable {

    private Long id;

    private PartyRelationType partyRelation;

    private Long fromPartyId;

    private Long toPartyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PartyRelationType getPartyRelation() {
        return partyRelation;
    }

    public void setPartyRelation(PartyRelationType partyRelation) {
        this.partyRelation = partyRelation;
    }

    public Long getFromPartyId() {
        return fromPartyId;
    }

    public void setFromPartyId(Long partyId) {
        this.fromPartyId = partyId;
    }

    public Long getToPartyId() {
        return toPartyId;
    }

    public void setToPartyId(Long partyId) {
        this.toPartyId = partyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PartyRelationDTO partyRelationDTO = (PartyRelationDTO) o;
        if (partyRelationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partyRelationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PartyRelationDTO{" +
            "id=" + getId() +
            ", partyRelation='" + getPartyRelation() + "'" +
            ", fromParty=" + getFromPartyId() +
            ", toParty=" + getToPartyId() +
            "}";
    }
}
