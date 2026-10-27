import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    elexon_base_url: str
    elexon_timeout_seconds: float
    frontend_origins: tuple[str, ...]


def get_settings() -> Settings:
    origins = os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001",
    )
    return Settings(
        elexon_base_url=os.getenv(
            "ELEXON_BASE_URL", "https://data.elexon.co.uk/bmrs/api/v1"
        ).rstrip("/"),
        elexon_timeout_seconds=float(os.getenv("ELEXON_TIMEOUT_SECONDS", "15")),
        frontend_origins=tuple(origin.strip() for origin in origins.split(",") if origin.strip()),
    )
