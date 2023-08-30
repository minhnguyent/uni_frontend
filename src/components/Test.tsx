import axios from "axios";
import { google } from "googleapis";
import { useEffect } from "react";

const CLIENT_ID = '411790374523-no23tnmpa68qc3bm1c7540vi6lgssmvf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

export const Test = () => {
    useEffect(() => {
        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        const scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly'];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });

        // Redirect the user to the authorization URL
        window.location.href = url;
    }, []);

    useEffect(() => {
        // Parse the authorization code from the URL after the redirect
        const authorizationCode = new URLSearchParams(window.location.search).get('code');

        if (authorizationCode) {
            // Exchange the authorization code for an access token
            const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
            oauth2Client.getToken(authorizationCode, async (err, tokens) => {
                if (err) {
                    console.error('Error getting tokens:', err);
                    return;
                }

                // Use the access token to fetch photos
                const photosApiUrl = 'https://photoslibrary.googleapis.com/v1/mediaItems';
                const response = await axios.get(photosApiUrl, {
                    headers: {
                        Authorization: `Bearer ${tokens.access_token}`,
                    },
                });

                console.log('Photos:', response.data.mediaItems);
            });
        }
    }, []);

    return <div>Loading...</div>;
};
