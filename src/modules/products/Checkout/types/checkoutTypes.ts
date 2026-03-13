export interface SelectOption {
  disabled: boolean;
  group?: {
    disabled: boolean;
    name: string;
  };
  selected: boolean;
  text: string;
  value: string;
}

export interface AddressForm {
  contactName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  stateOrProvinceId: number;
  districtId: number;
  countryId: string;
  city: string;
  zipCode: string;
  stateOrProvinces?: SelectOption[];
  districts?: SelectOption[];
  shipableContries?: SelectOption[];
}

export interface ExistingShippingAddress {
  userAddressId: number;
  contactName: string;
  phone: string;
  addressLine1: string;
  districtId: number;
  districtName: string;
  zipCode: string;
  stateOrProvinceId: number;
  stateOrProvinceName: string;
  cityName: string;
  countryId: string;
  countryName: string;
  isDistrictEnabled: boolean;
  isZipCodeEnabled: boolean;
  isCityEnabled: boolean;
}

export interface CreateCheckoutPayload {
  existingShippingAddresses: ExistingShippingAddress[];
  shippingAddressId: number;
  billingAddressId: number;
  shippingMethod: string;
  newAddressForm: AddressForm;
  useShippingAddressAsBillingAddress: boolean;
  newBillingAddressForm: AddressForm;
  orderNote: string;
  checkoutId: string;
}
