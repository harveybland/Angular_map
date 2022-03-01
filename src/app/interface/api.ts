export interface EvStation {
    ChargeDeviceId: string;
    Name?: string;
    Town?: string;
    County?: string;
    Postcode?: string;
    ConnectorType?: string;
    Latitude: number;
    Longitude: number;
}

export interface Details {
    Reference?: string;
    Name?: string;
    Street?: string;
    Town?: string;
    County?: string;
    PostCode?: string;
    DeviceOwnerName?: string;
    DeviceOwnerWebsite?: string;
    LocationLongDescription?: string;
    LocationShortDescription?: string;
    PaymentRequired?: boolean;
    PaymentRequiredDetails?: string;
    SubscriptionRequired?: boolean,
    SubscriptionRequiredDetails?: string;
    AccessRestrictionDetails?: string;
    Access: Access[],
    Connectors: ConnectorDetails[]
}

export interface ExactPath {
    ConnectorResults: EvStation[];
    Polyline: string;
}

export interface ConnectorDetails {
    ConnectorType?: string;
    RatedOutputKW?: number;
    OutputCurrent?: number;
    RatedVoltage?: number;
    ChargeMethod?: string;
    ChargeMode?: number;
    TetheredCable?: boolean;
    Status?: string;
    Description?: string;
    Validated?: boolean;
}

export interface Access {
    Day?: string;
    TimeFrom?: string;
    TimeTo?: string;
}