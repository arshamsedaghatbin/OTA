package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.roma.domain.enumeration.DocumenntType;

/**
 * A DTO for the Document entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    private DocumenntType addresType;

    private String description;

    private Long partyId;

    private Long partyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumenntType getAddresType() {
        return addresType;
    }

    public void setAddresType(DocumenntType addresType) {
        this.addresType = addresType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentDTO documentDTO = (DocumentDTO) o;
        if (documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
            "id=" + getId() +
            ", addresType='" + getAddresType() + "'" +
            ", description='" + getDescription() + "'" +
            ", party=" + getPartyId() +
            ", party=" + getPartyId() +
            "}";
    }
}
