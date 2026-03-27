const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Indian Kanoon API integration
const IK_BASE_URL = "https://api.indiankanoon.org";

// Search legal documents
router.get("/search", authMiddleware, async (req, res, next) => {
    try {
        const { q, pagenum = 0 } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Query parameter 'q' is required" });
        }

        // Check if API key is configured
        const apiToken = process.env.INDIAN_KANOON_API_TOKEN;
        if (!apiToken) {
            // Fallback to local database search
            return res.json({
                message: "Indian Kanoon API not configured, using local search",
                results: [],
                fallback: true
            });
        }

        const searchUrl = `${IK_BASE_URL}/search/?formInput=${encodeURIComponent(q)}&pagenum=${pagenum}`;

        const response = await axios.get(searchUrl, {
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Accept': 'application/json'
            },
            timeout: 10000
        });

        // Transform the response to match our format
        const results = response.data.docs.map(doc => ({
            _id: doc.tid,
            title: doc.title,
            content: doc.headline,
            category: "Court Judgment",
            type: "judgment",
            source: "Indian Kanoon",
            url: `https://indiankanoon.org/doc/${doc.tid}/`
        }));

        res.json({
            results,
            total: response.data.found || results.length,
            page: pagenum,
            hasMore: results.length === 10 // Assuming 10 results per page
        });

    } catch (error) {
        console.error("Indian Kanoon search error:", error.response?.data || error.message);

        // Fallback response
        res.json({
            message: "Search temporarily unavailable",
            results: [],
            error: error.message
        });
    }
});

// Get document details
router.get("/document/:docId", authMiddleware, async (req, res, next) => {
    try {
        const { docId } = req.params;
        const apiToken = process.env.INDIAN_KANOON_API_TOKEN;

        if (!apiToken) {
            return res.status(400).json({ message: "Indian Kanoon API not configured" });
        }

        const docUrl = `${IK_BASE_URL}/doc/${docId}/`;

        const response = await axios.get(docUrl, {
            headers: {
                'Authorization': `Token ${apiToken}`,
                'Accept': 'application/json'
            },
            timeout: 15000
        });

        res.json({
            _id: docId,
            title: response.data.title,
            content: response.data.doc,
            category: "Court Judgment",
            type: "judgment",
            source: "Indian Kanoon",
            url: `https://indiankanoon.org/doc/${docId}/`
        });

    } catch (error) {
        console.error("Indian Kanoon document error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Failed to fetch document",
            error: error.message
        });
    }
});

module.exports = router;