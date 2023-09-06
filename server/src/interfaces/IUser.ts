export default interface IUser {
   fullName: string;
   email: string;
   role: string;
   password: string;
   passwordAgain: string;
   passwordChangedAt?: Date;
   passwordResetToken?: string;
   passwordResetExpires?: number;
   createdAt: Date;
   phone: number;
}
