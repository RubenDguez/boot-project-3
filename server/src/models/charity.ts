
import {Schema, model, Document} from 'mongoose';

export interface CharityDocument extends Document {
    _id: string;
    name: string;
    description: string;
    image: string;
    website: string;
    locationAddress: string;
    nonprofitTags: string[];
}

const CharitySchema = new Schema<CharityDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    locationAddress: {
        type: String,
        required: true},
    nonprofitTags: {
        type: [String],
        required: true
    },
    
});


const Charity = model('Charity', CharitySchema);

export default Charity;