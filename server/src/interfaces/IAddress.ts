export default interface IAddress {
   postalCode: string;
   city: string;
   street: string;
   streetNumber: string;
   floor: string | null;
   door: string | null;
   ring: string | null;
}
