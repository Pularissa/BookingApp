package com.app.bookingapp.specification;

import com.app.bookingapp.models.Hotel;
import org.springframework.data.jpa.domain.Specification;

public class HotelSpecification {

    public static Specification<Hotel> hasLocation(String location) {
        return (root, query, cb) ->
                cb.equal(root.get("location"), location);
    }

    public static Specification<Hotel> hasRating(double rating) {
        return (root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("rating"), rating);
    }
}