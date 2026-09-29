# Data loading fixes for haemoglobinstrips.com

This update addresses data lookup and enquiry persistence issues found during static code review.

- Resolves old `websites/{website}/...` paths to the company-grouped SQLite paths used by the admin database.
- Fixes website-page lookups that rejected grouped paths because they expected the wrong number of path segments.
- Limits district data to this website instead of mixing district records from other sites.
- Adds a deduplicated fallback for older website-specific normal and category-product records when the master catalog is incomplete.
- Saves contact and product enquiries to `websitesQueries/{websiteId}/contactQueries` and `websitesQueries/{websiteId}/productQueries`, matching the admin query screens.
- Repairs malformed dynamic route directory names for `/category/[slug]` and `/brand/[slug]`.

## Verification notes

JavaScript syntax checks passed for the modified API routes and server data-fetcher. A full Next.js production build could not be completed in this environment because dependency installation did not finish and the `next` executable was unavailable. Please run `npm ci` and `npm run build` in the project environment before deployment.

The website runtime must have `SQLITE_DB_PATH` configured to point at the actual shared `catalog.db` file. A separate hosted service cannot read another service's local disk unless the database is explicitly shared/mounted or provided through a common storage setup.
