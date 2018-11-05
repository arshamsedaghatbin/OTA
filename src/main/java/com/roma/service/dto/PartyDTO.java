package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.roma.domain.enumeration.PartyType;

/**
 * A DTO for the Party entity.
 */
public class PartyDTO implements Serializable {

    private Long id;

    private String uuid;

    private PartyType pertyType;

    private Long relationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public PartyType getPertyType() {
        return pertyType;
    }

    public void setPertyType(PartyType pertyType) {
        this.pertyType = pertyType;
    }

    public Long getRelationId() {
        return relationId;
    }

    public void setRelationId(Long partyRelationId) {
        this.relationId = partyRelationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PartyDTO partyDTO = (PartyDTO) o;
        if (partyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PartyDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", pertyType='" + getPertyType() + "'" +
            ", relation=" + getRelationId() +
            "}";
    }
}
