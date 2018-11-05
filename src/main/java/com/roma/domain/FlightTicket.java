package com.roma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FlightTicket.
 */
@Entity
@Table(name = "flight_ticket")
public class FlightTicket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tcket_id")
    private String tcketId;

    @ManyToOne
    @JsonIgnoreProperties("flighttickets")
    private Party party;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTcketId() {
        return tcketId;
    }

    public FlightTicket tcketId(String tcketId) {
        this.tcketId = tcketId;
        return this;
    }

    public void setTcketId(String tcketId) {
        this.tcketId = tcketId;
    }

    public Party getParty() {
        return party;
    }

    public FlightTicket party(Party party) {
        this.party = party;
        return this;
    }

    public void setParty(Party party) {
        this.party = party;
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
        FlightTicket flightTicket = (FlightTicket) o;
        if (flightTicket.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightTicket.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightTicket{" +
            "id=" + getId() +
            ", tcketId='" + getTcketId() + "'" +
            "}";
    }
}
