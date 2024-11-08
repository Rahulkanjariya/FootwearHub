"use strict";

const type = {
    ADMIN: 1,
    USER: 2,
};

const gender = {
    MALE: 1,
    FEMALE: 2,
    OTHER: 3
};

const status = {
    Active: 1,
    Inactive: 0,
};

const orderStatus = {
    PENDING: 1,
    CONFIRMED: 2,
    SHIPPED: 3,
    DELIVERED: 4,
    CANCELLED: 5,
    RETURNED: 6, 
};

const paymentMethod = {
    CREDIT_CARD: 1,
    DEBIT_CARD: 2,
    CASH_ON_DELIVERY: 3,
};

const paymentStatus = {
    PENDING: 1,
    COMPLETED: 2,
    FAILED: 3
};

const shipmentStatus = {
    PENDING: 1,
    SHIPPED: 2,
    IN_TRANSIT: 3,
    DELIVERED: 4,
    RETURNED: 5,
}

module.exports = {
    type,
    gender,
    status,
    orderStatus,
    paymentMethod,
    paymentStatus,
    shipmentStatus
};