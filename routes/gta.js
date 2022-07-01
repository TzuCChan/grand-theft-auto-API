const express = require('express')
const router = express.Router()
const title = require('../models/title')

//Getting all
router.get('/', async (req, res) => {
  try {
    const gta = await title.find()
    res.json(gta)
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
})
//Getting one
router.get('/:id', getTitle, (req, res) => {
  res.json(req.title)
})
//Creating one
router.post('/', async (req, res) => {
  const title = new Title({
    name: req.body.name,
    cityBasedOn: req.body.cityBasedOn
  })
  try {
    const newTitle = await title.save()
    res.status(201).json(newTitle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//Updating one
router.patch('/:id', getTitle, async (req, res) => {
  if (req.body.name != null) {
    res.title.name = req.body.name
  }
  if (req.body.getTitle != null) {
    res.title.getTitle = req.body.getTitle
  }
  try {
    const updatedTitle = await res.title.save()
    res.json(updatedTitle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//Deleting one
router.delete('/:id', getTitle, async (req, res) => {
  try {
    await res.title.remove()
    res.json({ message: 'Deleted Title' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTitle(req, res, next) {
  let title
  try {
    title = await Title.findById(req.params.id)
    if (title == null) {
      return res.status(404).json({ message: 'Cannot find title' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message})
  }

  res.title = title
  next()
}

module.exports = router