// .d.ts stands for Type Declaration.

import {User, DeliveryPartner } from "../../generated/prisma/client.ts";

declare global {
    namespace Express {
        // "I'm extending Express's existing types."
        interface Request{
            // "Modify Express's Request interface."
            // user is an optional that why questinon mark
            // here adding two properties user and partner,uselike this ->req.user and req.partner
            user?:{
                id: string,
                isAdmin?: boolean;
            }
            partner?:DeliveryPartner
        }
    }
}

export {};