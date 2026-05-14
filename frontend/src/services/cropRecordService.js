// apps/frontend/src/services/cropRecordService.js
import API from '../api';

/**
 * Get all records for a cropId
 * returns array
 */
export async function getRecords(cropId) {
  const res = await API.get(`/crop-records/${cropId}`);
  return res.data;
}

/**
 * Add a record
 * payload must include cropId and required fields
 */
export async function addRecord(payload) {
  const res = await API.post('/crop-records', payload);
  return res.data;
}

/**
 * Update a record by id
 */
export async function updateRecord(id, payload) {
  const res = await API.put(`/crop-records/${id}`, payload);
  return res.data;
}

/**
 * Delete record
 */
export async function deleteRecord(id) {
  const res = await API.delete(`/crop-records/${id}`);
  return res.data;
}
