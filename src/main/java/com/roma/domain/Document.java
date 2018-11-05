package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.roma.domain.enumeration.DocumenntType;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "document")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "addres_type")
    private DocumenntType addresType;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Party party;



    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumenntType getAddresType() {
        return addresType;
    }

    public Document addresType(DocumenntType addresType) {
        this.addresType = addresType;
        return this;
    }

    public void setAddresType(DocumenntType addresType) {
        this.addresType = addresType;
    }

    public String getDescription() {
        return description;
    }

    public Document description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public void setParty(Party party) {
        this.party = party;
    }

    public Party getParty() {
        return party;
    }

    public Document party(Party party) {
        this.party = party;
        return this;
    }


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", addresType='" + getAddresType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
