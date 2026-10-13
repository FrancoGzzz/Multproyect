-- TuCasa.click CRM: borrador inicial de esquema MySQL.
-- No ejecutar sobre la base universal sin acordar las entidades compartidas.
-- Los nombres/campos deben validarse con el ER de Gaia y los demás módulos.

CREATE DATABASE IF NOT EXISTS tucasa_crm_demo
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tucasa_crm_demo;

CREATE TABLE contacto (
  id_contacto BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  email VARCHAR(160),
  nro_documento VARCHAR(40),
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE asesor (
  id_asesor BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_empresa BIGINT UNSIGNED NOT NULL,
  tipo ENUM('INTERNO','EXTERNO') NOT NULL,
  id_empleado BIGINT UNSIGNED NULL,
  id_proveedor BIGINT UNSIGNED NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (tipo = 'INTERNO' AND id_empleado IS NOT NULL AND id_proveedor IS NULL)
    OR
    (tipo = 'EXTERNO' AND id_proveedor IS NOT NULL AND id_empleado IS NULL)
  )
);

CREATE TABLE lead (
  id_lead BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_empresa BIGINT UNSIGNED NOT NULL,
  id_contacto BIGINT UNSIGNED NOT NULL,
  id_propiedad BIGINT UNSIGNED NULL,
  id_asesor BIGINT UNSIGNED NULL,
  estado ENUM('NUEVO','EN_SEGUIMIENTO','CALIFICADO','CERRADO','DESCARTADO')
    NOT NULL DEFAULT 'NUEVO',
  mensaje TEXT,
  fuente VARCHAR(80),
  id_lead_recibido BIGINT UNSIGNED NULL,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lead_contacto FOREIGN KEY (id_contacto)
    REFERENCES contacto(id_contacto),
  CONSTRAINT uq_lead_recibido UNIQUE (id_lead_recibido),
  INDEX idx_lead_estado (estado),
  INDEX idx_lead_asesor (id_asesor)
);

CREATE TABLE etapa (
  id_etapa BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_empresa BIGINT UNSIGNED NOT NULL,
  nombre VARCHAR(80) NOT NULL,
  orden SMALLINT UNSIGNED NOT NULL,
  tipo ENUM('ABIERTA','GANADA','PERDIDA') NOT NULL DEFAULT 'ABIERTA',
  UNIQUE KEY uq_etapa_empresa_orden (id_empresa, orden)
);

CREATE TABLE oportunidad (
  id_oportunidad BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_empresa BIGINT UNSIGNED NOT NULL,
  id_lead BIGINT UNSIGNED NOT NULL,
  id_propiedad BIGINT UNSIGNED NULL,
  id_etapa BIGINT UNSIGNED NOT NULL,
  monto_estimado DECIMAL(18,2) NULL,
  fecha_proxima_accion DATETIME NULL,
  observaciones TEXT,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_oportunidad_lead FOREIGN KEY (id_lead)
    REFERENCES lead(id_lead),
  CONSTRAINT fk_oportunidad_etapa FOREIGN KEY (id_etapa)
    REFERENCES etapa(id_etapa),
  INDEX idx_oportunidad_empresa (id_empresa)
);

CREATE TABLE actividad (
  id_actividad BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_empresa BIGINT UNSIGNED NOT NULL,
  id_lead BIGINT UNSIGNED NULL,
  id_oportunidad BIGINT UNSIGNED NULL,
  id_asesor BIGINT UNSIGNED NULL,
  tipo ENUM('LLAMADA','VISITA','MENSAJE','PROPUESTA','TAREA','OTRO')
    NOT NULL DEFAULT 'TAREA',
  asunto VARCHAR(160) NOT NULL,
  fecha_programada DATETIME NULL,
  fecha_realizacion DATETIME NULL,
  estado ENUM('PENDIENTE','COMPLETADA','CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
  resultado TEXT,
  CONSTRAINT fk_actividad_lead FOREIGN KEY (id_lead) REFERENCES lead(id_lead),
  CONSTRAINT fk_actividad_oportunidad FOREIGN KEY (id_oportunidad)
    REFERENCES oportunidad(id_oportunidad),
  INDEX idx_actividad_fecha (fecha_programada),
  INDEX idx_actividad_estado (estado)
);

-- Integración pendiente con Gaia:
-- LEAD_RECIBIDO debe conservar el ID de la consulta original.
-- Acordar si se agrega FK real a LEAD o se usa un identificador de integración.
-- Antes de crear las FK de empresa/propiedad/asesor, referenciar las tablas
-- compartidas oficiales de la BD universal (no duplicarlas en este esquema).
