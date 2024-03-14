const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
    auth:  "secret_p8ixPYOQsnftAXxEKXHOn3DgzACGQW51xEmiG1i7O76",
});


const aiArray = []; 
const aiData = {
    "name": "name",
    "description": "description",
    "Due_date": "Due_date",
};
console.log(`Fetched ${aiData.name}.`);
console.log(`Fetched ${aiData.description}.`);

aiArray.push(aiData);
aiArray.push(aiData);

const memberData = [
    {
        
        name: " Ruchira more ",
        description: "Description for Member 1",
        status: "In Progress",
        progress: "50%",
        Due_date : new Date().toISOString() ,
    },
    {
        name: " palak lohade",
        description: "Description for Member 2",
        status: "done",
        progress: "100%",
        Due_date : new Date().toISOString(), 

    },
];

async function createNotionPagesForMember(member) {
    const data = {
        parent: {
            type: "database_id",
            database_id: "536af542c8544d778ffc5bee4e1977c2", 
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: member.name,
                        },
                        "annotations": {
                            "bold": true,
                            "italic": true,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "gray"
                        },
                        "plain_text": "Bug bash",
                        "href": null
                    },
                ],
            },
            "description": {
                rich_text: [
                    {
                        text: {
                            content: member.description,
                        },
                    },
                ],
            },
        
            "Due_date": {
                "id": "M%3BBw",
                "type": "date",
                "date": {
                    "start": member.Due_date,
                    "end": null,
                    "time_zone": null
                }
            },
            
        },
        "cover": null,
        "icon": {
            "type": "emoji",
            "emoji": "🐸"
        },
        "Status": {
            "id": "Z%3ClH",
            "type": "status",
            "status": {
                "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
                "name": member.status,
                "color": "default"
            }
        }
    };

    try {
        const response = await notion.pages.create(data);
        console.log(`Created Notion page for ${member.name}`);
        console.log(response);
    } catch (error) {
        console.error('Error creating Notion page:', error);
    }
}

async function createNotionPagesForAllMembers(memberData) {
    for (let member of memberData) {
        await createNotionPagesForMember(member);
        await sleep(300); 
    }

    console.log('Operation complete.');
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

createNotionPagesForAllMembers(memberData);

