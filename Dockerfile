# ---- Build stage: compile the React/Vite site to static files ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# Optional: where portal buttons ("Login to Portal", "Get Started") point.
# Empty = local placeholder pages.
ARG VITE_PORTAL_URL=
ENV VITE_PORTAL_URL=$VITE_PORTAL_URL

RUN npm run build

# ---- Runtime stage: serve with nginx ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/healthz || exit 1
