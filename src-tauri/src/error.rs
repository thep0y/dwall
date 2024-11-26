use serde::{Serialize, Serializer};

pub type DwallResult<T> = std::result::Result<T, DwallError>;

#[derive(Debug, thiserror::Error)]
pub enum DwallError {
    #[error(transparent)]
    Update(#[from] tauri_plugin_updater::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Request(#[from] reqwest::Error),
    #[error(transparent)]
    ZipExtract(#[from] zip_extract::ZipExtractError),
    #[error(transparent)]
    Windows(#[from] windows::core::Error),
    #[error(transparent)]
    Theme(#[from] crate::theme::ThemeError),
    #[error(transparent)]
    SerdeJson(#[from] serde_json::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
    #[error(transparent)]
    Config(#[from] crate::config::ConfigError),
}

impl Serialize for DwallError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
