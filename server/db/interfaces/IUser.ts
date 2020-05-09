import { Document } from 'mongoose';

export default interface UserInterface extends Document {

    name?: string;
    facebookID?: string;
    googleID?: string;
    email?: string;
    monthlyBudget?: number;
    accessTokens?: Array<string>;
    itemId?: Array<string>;
    displayNames?: Array<string>;
    lastAccessed?: string;

}

