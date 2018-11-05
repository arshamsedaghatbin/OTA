package com.roma.repository;

import com.roma.domain.FlightTicket;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightTicket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {

}
