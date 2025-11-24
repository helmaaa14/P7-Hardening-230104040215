let members = require('../data/members');

// GET all members
exports.getAllMembers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: members
  });
};

// GET member by ID
exports.getMemberById = (req, res) => {
  const id = parseInt(req.params.id);
  const member = members.find(m => m.id === id);

  if (!member) {
    return res.status(404).json({
      status: 'fail',
      message: 'Member tidak ditemukan'
    });
  }

  res.status(200).json({
    status: 'success',
    data: member
  });
};

// POST new member
exports.createMember = (req, res) => {
  const { name, role, joinedAt } = req.body;

  // Validasi field wajib
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'name' wajib diisi"
    });
  }

  if (!role) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'role' wajib diisi"
    });
  }

  if (!joinedAt) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'joinedAt' wajib diisi"
    });
  }

  // Generate ID baru
  const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;

  const newMember = {
    id: newId,
    name,
    role,
    joinedAt
  };

  members.push(newMember);

  res.status(201).json({
    status: 'success',
    data: newMember
  });
};

// PUT update member
exports.updateMember = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role, joinedAt } = req.body;
  const memberIndex = members.findIndex(m => m.id === id);

  if (memberIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Member tidak ditemukan'
    });
  }

  // Validasi field wajib
  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'name' wajib diisi"
    });
  }

  if (!role) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'role' wajib diisi"
    });
  }

  if (!joinedAt) {
    return res.status(400).json({
      status: 'fail',
      message: "Field 'joinedAt' wajib diisi"
    });
  }

  // Update data
  members[memberIndex] = {
    id,
    name,
    role,
    joinedAt
  };

  res.status(200).json({
    status: 'success',
    data: members[memberIndex]
  });
};

// DELETE member
exports.deleteMember = (req, res) => {
  const id = parseInt(req.params.id);
  const memberIndex = members.findIndex(m => m.id === id);

  if (memberIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Member tidak ditemukan'
    });
  }

  members.splice(memberIndex, 1);

  res.status(204).send();
};