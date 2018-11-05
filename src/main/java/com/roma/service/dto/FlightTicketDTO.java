package com.roma.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the FlightTicket entity.
 */
public class FlightTicketDTO implements Serializable {

    private Long id;

    private String tcketId;

    private Long partyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTcketId() {
        return tcketId;
    }

    public void setTcketId(String tcketId) {
        this.tcketId = tcketId;
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

        FlightTicketDTO flightTicketDTO = (FlightTicketDTO) o;
        if (flightTicketDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightTicketDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightTicketDTO{" +
            "id=" + getId() +
            ", tcketId='" + getTcketId() + "'" +
            ", party=" + getPartyId() +
            "}";
    }
}
