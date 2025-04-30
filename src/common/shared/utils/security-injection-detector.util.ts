import { SECURITY_INJECTION_DETECTOR } from '@common/shared/constants/security-injection-detector';

/**
 * Verifica si un cuerpo de solicitud contiene patrones maliciosos.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @param patterns Los patrones maliciosos a comprobar.
 * @returns Verdadero si se detecta un patrón malicioso, falso en caso contrario.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
function checkForAttack(body: string | object, patterns: RegExp[]): boolean {
  const checkPatterns = (obj: string | object): boolean => {
    if (typeof obj === 'string') {
      return patterns.some((pattern) => pattern.test(obj));
    }
    if (typeof obj === 'object') {
      return Object.values(obj).some((value) => checkPatterns(value));
    }

    return false;
  };

  return checkPatterns(body);
}

/**
 * Verifica si hay intentos de inyección SQL en el cuerpo de la solicitud.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @returns Verdadero si se detecta un intento de inyección SQL.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
export function checkForSqlInjection(body: string | object): boolean {
  return checkForAttack(
    body,
    SECURITY_INJECTION_DETECTOR.SQL_INJECTION_PATTERNS
  );
}

/**
 * Verifica si hay intentos de inyección XSS en el cuerpo de la solicitud.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @returns Verdadero si se detecta un intento de inyección XSS.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
export function checkForXSS(body: string | object): boolean {
  return checkForAttack(body, SECURITY_INJECTION_DETECTOR.XSS_PATTERNS);
}

/**
 * Verifica si hay intentos de inyección XXE en el cuerpo de la solicitud.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @returns Verdadero si se detecta un intento de inyección XXE.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
export function checkForXXE(body: string | object): boolean {
  return checkForAttack(body, SECURITY_INJECTION_DETECTOR.XXE_PATTERNS);
}

/**
 * Verifica si hay intentos de inyección LDAP en el cuerpo de la solicitud.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @returns Verdadero si se detecta un intento de inyección LDAP.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
export function checkForLDAPInjection(body: string | object): boolean {
  return checkForAttack(
    body,
    SECURITY_INJECTION_DETECTOR.LDAP_INJECTION_PATTERNS
  );
}

/**
 * Verifica si hay rutas no permitidas en el cuerpo de la solicitud.
 *
 * @param body El cuerpo de la solicitud a verificar.
 * @returns Verdadero si se detectan rutas no permitidas.
 *
 * @author Andres Gutierrez Velez <sr.willardkraft@gmail.com>
 * @date   18-12-2024
 */
export function checkForRute(body: string | object): boolean {
  return checkForAttack(body, SECURITY_INJECTION_DETECTOR.BLACK_RUTES);
}

export function sanitizeHeaders(
  headers: Record<string, unknown>
): Record<string, unknown> {
  const sensitiveHeaders = ['accept'];
  const sanitized = { ...headers };
  sensitiveHeaders.forEach((header) => {
    if (sanitized[header]) {
      delete sanitized[header];
    }
  });

  return sanitized;
}
